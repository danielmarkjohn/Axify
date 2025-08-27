export const appConfig = {
  // App metadata
  title: 'Axify Store',
  
  // Admin settings
  adminPassword: 'admin123',
  
  // UI text
  text: {
    // Header
    adminButton: 'Admin',
    userViewButton: 'User View',
    
    // Search and filters
    searchPlaceholder: 'Search apps...',
    favoritesOnlyLabel: 'Favorites only',
    categoryLabel: 'Category:',
    sortByLabel: 'Sort by:',
    
    // Sort options
    sortOptions: {
      name: 'Name',
      category: 'Category',
      price: 'Price'
    },
    
    // Categories
    allCategory: 'All',
    
    // Admin panel
    adminPanelTitle: 'Admin Panel',
    adminPasswordPrompt: 'Admin Access',
    adminPasswordPlaceholder: 'Enter admin password',
    loginButton: 'Login',
    cancelButton: 'Cancel',
    incorrectPasswordMessage: 'Incorrect password',
    
    // Add app modal
    addAppTitle: 'Add New App',
    addAppButton: 'Add App',
    updateAppButton: 'Add / Update App',
    
    // Form labels
    nameLabel: 'Name',
    iconLabel: 'Icon URL',
    linkLabel: 'Link',
    categorySelectLabel: 'Category',
    priceLabel: 'Price (optional)',
    tagsLabel: 'Tags (comma-separated)',
    descriptionLabel: 'Description',
    
    // Form placeholders
    namePlaceholder: 'App Name',
    iconPlaceholder: 'Icon URL',
    linkPlaceholder: 'Link',
    
    // Buttons
    openButton: 'Open',
    closeButton: 'Close',
    deleteButton: 'Delete',
    
    // Add app card
    addNewAppTitle: 'Add New App',
    addNewAppDescription: 'Create a card with name, link, and icon',
    
    // Accessibility
    toggleFavoriteAdd: 'Add to favorites',
    toggleFavoriteRemove: 'Remove from favorites',
    toggleThemeLight: 'Switch to light mode',
    toggleThemeDark: 'Switch to dark mode',
    toggleThemeLabel: 'Toggle Theme'
  },
  
  // Default values
  defaults: {
    untitledApp: 'Untitled',
    defaultIcon: 'https://via.placeholder.com/64',
    defaultLink: '#',
    defaultCategory: 'Tech' as const,
    minCardHeight: 170
  },
  
  // Categories list
  categories: ['Free', 'Paid', 'Tech', 'Living', 'Tools', 'Gaming'] as const,
  
  // Grid settings
  grid: {
    cols: "grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8"
  }
}

export type AppCategory = typeof appConfig.categories[number]
