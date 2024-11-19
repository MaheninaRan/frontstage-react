const menuItems = {
  items: [
    {
      id: 'navigation',
      title: 'Navigation',
      type: 'group',
      icon: 'icon-navigation',
      children: [
        {
          id: 'dashboard',
          title: 'Teste',
          type: 'item',
          icon: 'feather icon-briefcase',
          url: '/produit/default'
        },
        {
          id: 'dashboard',
          title: 'Finance',
          type: 'item',
          icon: 'feather icon-briefcase',
          url: '/app/dashboard/default'
        },
        {
          id: 'dashboard',
          title: 'Produit',
          type: 'item',
          icon: 'feather icon-tag',
          url: '/produit/produit'
        },
        {
          id: 'dashboard',
          title: 'Commande',
          type: 'collapse',
          icon: 'feather icon-clipboard ',
          children: [
            {
              id: 'dashboard',
              title: 'Historique',
              type: 'item',
              url: '/commande/historique'
            },
            {
              id: 'dashboard',
              title: 'Retour client',
              type: 'item',
              url: '/commande/retourclient'
            }
          ]
          
        },
        {
          id: 'maps',
          title: 'Livraison',
          type: 'item',
          icon: 'feather icon-navigation',
          url: '/livraison/google-map'
        },
        {
          id: 'table',
          title: 'Stock',
          type: 'collapse',
          icon: 'feather icon-package',
          children: [
            {
              id: 'table',
              title: 'Produit',
              type: 'item',
              url: '/stock/produit'
            },
            {
              id: 'table',
              title: 'Matiere',
              type: 'item',
              url: '/stock/matiere'
            },
            {
              id: 'table',
              title: 'MouvementStock',
              type: 'item',
              url: '/stock/mouvementstock'
            }
            
          ]
        },
        {
          id: 'component',
          title: 'Component',
          type: 'collapse',
          icon: 'feather icon-box',
          children: [
            {
              id: 'button',
              title: 'Button',
              type: 'item',
              url: '/basic/button'
            },
            {
              id: 'badges',
              title: 'Badges',
              type: 'item',
              url: '/basic/badges'
            },
            {
              id: 'breadcrumb',
              title: 'Breadcrumb & Pagination',
              type: 'item',
              url: '/basic/breadcrumb-paging'
            },
            {
              id: 'collapse',
              title: 'Collapse',
              type: 'item',
              url: '/basic/collapse'
            },
            {
              id: 'tabs-pills',
              title: 'Tabs & Pills',
              type: 'item',
              url: '/basic/tabs-pills'
            },
            {
              id: 'typography',
              title: 'Typography',
              type: 'item',
              url: '/basic/typography'
            }
          ]
        },

        
        {
          id: 'forms',
          title: 'Form Elements',
          type: 'item',
          icon: 'feather icon-file-text',
          url: '/forms/form-basic'
        },
        {
          id: 'charts',
          title: 'Charts',
          type: 'item',
          icon: 'feather icon-pie-chart',
          url: '/charts/nvd3'
        }
        
        
      ]
    },
    
    {
      id: 'pages',
      title: 'Setting',
      type: 'group',
      icon: 'icon-pages',
      children: [
        
        {
          id: 'sample-page',
          title: 'Apropos',
          type: 'item',
          url: '/sample-page',
          classes: 'nav-item',
          icon: 'feather icon-sidebar'
        },
        {
          id: 'disabled-menu',
          title: 'Deconnexion',
          type: 'item',
          url: '/logout',
          classes: 'nav-item disabled',
          icon: 'feather icon-power'
        }
      ]
    }
  ]
};

export default menuItems;
