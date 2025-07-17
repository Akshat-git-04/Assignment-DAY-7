// import React from 'react';
// import { Card, CardContent } from '@/components/ui/card';
// import { ShoppingCart, DollarSign, Users, Package } from 'lucide-react';

// const statCards = [
//   {
//     label: 'Total Sales',
//     value: '$12,345',
//     icon: <DollarSign className="text-green-600" />,
//     bg: 'bg-green-50',
//   },
//   {
//     label: 'Orders',
//     value: '523',
//     icon: <ShoppingCart className="text-blue-600" />,
//     bg: 'bg-blue-50',
//   },
//   {
//     label: 'Customers',
//     value: '317',
//     icon: <Users className="text-purple-600" />,
//     bg: 'bg-purple-50',
//   },
//   {
//     label: 'Products',
//     value: '128',
//     icon: <Package className="text-orange-600" />,
//     bg: 'bg-orange-50',
//   },
// ];

// export default function AnalyticsDashboard() {
//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
//       {statCards.map((card, index) => (
//         <Card key={index} className={`p-4 rounded-xl shadow-sm ${card.bg}`}>
//           <CardContent className="flex items-center gap-4">
//             <div className="p-2 bg-white rounded-full shadow">{card.icon}</div>
//             <div>
//               <div className="text-xl font-bold">{card.value}</div>
//               <div className="text-gray-500 text-sm">{card.label}</div>
//             </div>
//           </CardContent>
//         </Card>
//       ))}
//     </div>
//   );
// }
