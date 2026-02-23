import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  storeProductId: string
  name: string
  price: number
  image?: string
  quantity: number
  slug?: string
}

interface CartState {
  activeStoreId: string | null
  items: CartItem[]
  userId: string | null
  setUserId: (userId: string | null) => void
  addItem: (product: { storeProductId: string; name: string; price: number; image?: string; slug?: string }, storeId: string) => void
  removeItem: (storeProductId: string) => void
  clearCart: () => void;
  fetchCart: (userId: string) => Promise<void>;
  instructions: string;
  setInstructions: (note: string) => void;
}

// Helper function to sync cart to DB (outside the store)
const syncCartToDB = async (userId: string, action: 'add' | 'remove', storeProductId: string) => {
  const endpoint = action === 'add' ? '/api/cart/add' : '/api/cart/remove';
  console.log(`[Cart] Syncing ${action} to DB:`, storeProductId);
  
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId,
        storeProductId,
        quantity: action === 'add' ? 1 : undefined
      })
    });
    const data = await response.json();
    console.log('[Cart] DB sync response:', data);
  } catch (error) {
    console.error(`Failed to sync cart ${action} with DB:`, error);
  }
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      activeStoreId: null,
      items: [],
      userId: null,
      
      setUserId: (userId) => {
        const currentUserId = get().userId;
        console.log('[Cart] setUserId called. Current:', currentUserId, 'New:', userId);
        
        if (userId !== currentUserId) {
          console.log('[Cart] User changed! Clearing local cart items.');
          set({ userId, items: [], activeStoreId: null });
          
          if (userId) {
            // Fetch cart from server for the new user
            get().fetchCart(userId);
          }
        }
      },

      fetchCart: async (userId: string) => {
        console.log('[Cart] Fetching cart for user:', userId);
        try {
          const response = await fetch(`/api/cart?userId=${userId}`);
          const data = await response.json();
          console.log('[Cart] Received server cart:', data);
          
          if (data && data.items) {
            const formattedItems = data.items.map((item: any) => ({
              storeProductId: item.storeProductId,
              name: item.storeProduct?.product?.name || 'Unknown',
              price: item.storeProduct?.price || 0,
              quantity: item.quantity,
              image: item.storeProduct?.product?.image,
              slug: item.storeProduct?.product?.slug
            }));
            
            set({ 
              items: formattedItems,
              activeStoreId: data.storeId || (formattedItems.length > 0 ? '1' : null)
            });
          }
        } catch (error) {
          console.error('[Cart] Failed to fetch server cart:', error);
        }
      },

      addItem: (product, storeId) => {
        const state = get()
        
        // Optimistic update - instant UI feedback
        if (state.activeStoreId && state.activeStoreId !== storeId) {
          set({ activeStoreId: storeId, items: [] })
        }
        
        set((state) => {
          const existing = state.items.find(i => i.storeProductId === product.storeProductId)
          if (existing) {
            return {
              activeStoreId: storeId,
              items: state.items.map(i => i.storeProductId === product.storeProductId ? { ...i, quantity: i.quantity + 1 } : i)
            }
          }
          return {
            activeStoreId: storeId,
            items: [...state.items, { storeProductId: product.storeProductId, name: product.name, price: product.price, image: product.image, quantity: 1, slug: product.slug }]
          }
        })

        // Sync with DB in background (non-blocking)
        const currentState = get()
        console.log('[Cart] Attempting DB sync. UserId:', currentState.userId);
        if (currentState.userId) {
          syncCartToDB(currentState.userId, 'add', product.storeProductId);
        } else {
          console.warn('[Cart] No userId - skipping DB sync');
        }
      },

      removeItem: (id) => {
        // Optimistic update
        set((state) => ({
          items: state.items.map(i => i.storeProductId === id ? { ...i, quantity: i.quantity - 1 } : i).filter(i => i.quantity > 0)
        }))

        // Sync with DB in background (non-blocking)
        const state = get()
        if (state.userId) {
          syncCartToDB(state.userId, 'remove', id);
        }
      },

      clearCart: () => set({ items: [], activeStoreId: null, instructions: "" }),
      
      // New: Persist instructions
      instructions: "",
      setInstructions: (instructions: string) => set({ instructions })
    }),
    { 
      name: 'cart-storage',
      version: 1, // Add version to invalidate old cache if needed
      migrate: (persistedState: any, version: number) => {
        if (version === 0) {
          // Migration logic if needed, or just return fresh state
          return { ...persistedState, items: [] };
        }
        return persistedState;
      }
    }
  )
)
