export const DELIVERY_ZONES = {
  gasabo: { name: 'Gasabo', fee: 2000, eta: '2 hours', nameRw: 'Gasabo' },
  kicukiro: { name: 'Kicukiro', fee: 2000, eta: '2 hours', nameRw: 'Kicukiro' },
  nyarugenge: { name: 'Nyarugenge', fee: 2000, eta: '2 hours', nameRw: 'Nyarugenge' },
  national: { name: 'Outside Kigali', fee: 5000, eta: '10 hours', nameRw: 'Hanze y\'a Kigali' }
}

// 🚀 Updated to check for subtotal threshold
export const getDeliveryFee = (zone, subtotal = 0) => {
  if (subtotal >= 50000) return 0;
  return DELIVERY_ZONES[zone]?.fee || 0;
}

export const getDeliveryETA = (zone) => {
  return DELIVERY_ZONES[zone]?.eta || '2-10 hours'
}