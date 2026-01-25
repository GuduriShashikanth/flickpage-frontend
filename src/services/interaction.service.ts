import api from './api';

type InteractionType = 'view' | 'click' | 'search';
type ItemType = 'movie' | 'book';

interface InteractionData {
  item_id: string;
  item_type: ItemType;
  interaction_type: InteractionType;
}

interface InteractionQueue {
  data: InteractionData;
  timestamp: number;
}

class InteractionService {
  private queue: InteractionQueue[] = [];
  private processing = false;
  private debounceTimers: Map<string, number> = new Map();
  private readonly DEBOUNCE_DELAY = 1000; // 1 second
  private readonly MAX_QUEUE_SIZE = 50;

  /**
   * Track an interaction (fire and forget)
   * @param itemId - UUID of the movie or book
   * @param itemType - 'movie' or 'book'
   * @param interactionType - 'view', 'click', or 'search'
   */
  async track(
    itemId: string,
    itemType: ItemType,
    interactionType: InteractionType
  ): Promise<void> {
    // Validate UUID format
    if (!this.isValidUUID(itemId)) {
      console.warn('[Interaction] Invalid UUID format:', itemId);
      return;
    }

    // Validate item_type
    if (itemType !== 'movie' && itemType !== 'book') {
      console.warn('[Interaction] Invalid item_type:', itemType);
      return;
    }

    // Validate interaction_type
    if (interactionType !== 'view' && interactionType !== 'click' && interactionType !== 'search') {
      console.warn('[Interaction] Invalid interaction_type:', interactionType);
      return;
    }

    // Ensure all values are strings (extra safety)
    const data: InteractionData = {
      item_id: String(itemId),
      item_type: String(itemType) as ItemType,
      interaction_type: String(interactionType) as InteractionType,
    };

    // Debounce rapid interactions for the same item
    const key = `${itemId}-${interactionType}`;
    if (this.debounceTimers.has(key)) {
      clearTimeout(this.debounceTimers.get(key)!);
    }

    const timer = setTimeout(() => {
      this.debounceTimers.delete(key);
      this.sendInteraction(data);
    }, this.DEBOUNCE_DELAY);

    this.debounceTimers.set(key, timer);
  }

  /**
   * Track a view interaction (when user opens item details)
   */
  trackView(itemId: string, itemType: ItemType): void {
    this.track(itemId, itemType, 'view');
  }

  /**
   * Track a click interaction (when user clicks on item card)
   */
  trackClick(itemId: string, itemType: ItemType): void {
    this.track(itemId, itemType, 'click');
  }

  /**
   * Track a search interaction (when item appears in search results)
   */
  trackSearch(itemId: string, itemType: ItemType): void {
    this.track(itemId, itemType, 'search');
  }

  /**
   * Send interaction to API
   */
  private async sendInteraction(data: InteractionData): Promise<void> {
    try {
      // Log what we're sending for debugging
      console.debug('[Interaction] Sending:', JSON.stringify(data));
      
      const response = await api.post('/interactions', data);
      
      if (response.data.success) {
        console.debug('[Interaction] Tracked:', data.interaction_type, data.item_type, data.item_id);
      } else {
        console.warn('[Interaction] Failed:', response.data.message);
        // Log the full error for debugging
        if (response.data.error) {
          console.error('[Interaction] Error details:', response.data.error);
        }
      }
    } catch (error: any) {
      // If offline or network error, queue for later
      if (!navigator.onLine || error.code === 'ERR_NETWORK') {
        this.queueInteraction(data);
      } else {
        console.error('[Interaction] Error:', error.message);
        // Log response data if available
        if (error.response?.data) {
          console.error('[Interaction] Response error:', error.response.data);
        }
      }
    }
  }

  /**
   * Queue interaction for later (when offline)
   */
  private queueInteraction(data: InteractionData): void {
    if (this.queue.length >= this.MAX_QUEUE_SIZE) {
      // Remove oldest item
      this.queue.shift();
    }

    this.queue.push({
      data,
      timestamp: Date.now(),
    });

    console.debug('[Interaction] Queued:', data);

    // Try to process queue when online
    if (!this.processing) {
      window.addEventListener('online', () => this.processQueue());
    }
  }

  /**
   * Process queued interactions
   */
  private async processQueue(): Promise<void> {
    if (this.processing || this.queue.length === 0) {
      return;
    }

    this.processing = true;
    console.debug('[Interaction] Processing queue:', this.queue.length, 'items');

    while (this.queue.length > 0) {
      const item = this.queue.shift();
      if (item) {
        await this.sendInteraction(item.data);
        // Small delay between requests
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }

    this.processing = false;
  }

  /**
   * Validate UUID format
   */
  private isValidUUID(uuid: string): boolean {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return uuidRegex.test(uuid);
  }

  /**
   * Clear all pending timers (useful for cleanup)
   */
  cleanup(): void {
    this.debounceTimers.forEach(timer => clearTimeout(timer));
    this.debounceTimers.clear();
  }
}

// Export singleton instance
export const interactionService = new InteractionService();

// Export for direct use
export default interactionService;
