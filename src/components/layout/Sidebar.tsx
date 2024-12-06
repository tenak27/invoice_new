import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Package, 
  FileText, 
  Users, 
  Settings, 
  Tags, 
  Truck, 
  FileCheck,
  UserPlus,
  ClipboardList
} from 'lucide-react';
import { Logo } from './Logo';
import { usePermissions } from '../../hooks/usePermissions';
import { UserPermissions } from '../../types/user';
import { menuSlide, staggerChildren } from '../../lib/utils/animations';

const menuItems = [
  {
    to: "/dashboard",
    icon: LayoutDashboard,
    label: "Tableau de bord"
  },
  {
    to: "/inventory",
    icon: Package,
    label: "Inventaire",
    permission: UserPermissions.VIEW_INVENTORY
  },
  {
    to: "/quotes",
    icon: FileCheck,
    label: "Devis",
    permission: UserPermissions.VIEW_QUOTES
  },
  {
    to: "/invoices",
    icon: FileText,
    label: "Factures",
    permission: UserPermissions.VIEW_INVOICES
  },
  {
    to: "/purchase-orders",
    icon: ClipboardList,
    label: "Bons de commande",
    permission: UserPermissions.VIEW_INVENTORY
  },
  {
    to: "/customers",
    icon: Users,
    label: "Clients",
    permission: UserPermissions.VIEW_CUSTOMERS
  },
  {
    to: "/suppliers",
    icon: Truck,
    label: "Fournisseurs",
    permission: UserPermissions.VIEW_SUPPLIERS
  },
  {
    to: "/categories",
    icon: Tags,
    label: "Catégories",
    permission: UserPermissions.VIEW_INVENTORY
  },
  {
    to: "/users",
    icon: UserPlus,
    label: "Utilisateurs",
    permission: UserPermissions.VIEW_USERS
  }
];

export function Sidebar() {
  const { hasPermission } = usePermissions();
  const location = useLocation();
  const filteredMenuItems = menuItems.filter(item => 
    !item.permission || hasPermission(item.permission)
  );

  return (
    <motion.div
      variants={menuSlide}
      initial="initial"
      animate="animate"
      exit="exit"
      className="h-full bg-background-secondary border-r border-border overflow-y-auto"
    >
      <div className="p-6">
        <Logo size="sm" className="mb-8" />

        <motion.nav
          variants={staggerChildren}
          initial="initial"
          animate="animate"
          className="space-y-2"
        >
          {filteredMenuItems.map((item) => (
            <motion.div
              key={item.to}
              variants={menuSlide}
              whileHover={{ x: 4 }}
              className="relative"
            >
              <Link
                to={item.to}
                className={`menu-item ${location.pathname === item.to ? 'active' : ''}`}
              >
                <item.icon className="h-5 w-5 mr-3" />
                <span>{item.label}</span>
              </Link>
            </motion.div>
          ))}

          {hasPermission(UserPermissions.VIEW_SETTINGS) && (
            <motion.div
              variants={menuSlide}
              whileHover={{ x: 4 }}
              className="relative"
            >
              <Link
                to="/settings"
                className={`menu-item ${location.pathname === '/settings' ? 'active' : ''}`}
              >
                <Settings className="h-5 w-5 mr-3" />
                <span>Paramètres</span>
              </Link>
            </motion.div>
          )}
        </motion.nav>
      </div>
    </motion.div>
  );
}