export const priceToNaira = (price) => {
  let nigerianNaira = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "NGN",
  });
  return nigerianNaira.format(price)
}

export const nairaToNumber = (naira) => {
  return Number((naira.split(".")[0]).replace(/\D/g, ''))
}

export const calculatePrice = (distance) => {
  const distanceFilterd = Number(distance.split(" ")[0])
  const unit = distance.split(" ")[1]
  let calculatedDistance = 1

  if (unit === 'km') {
    if (distanceFilterd <= 5) {
      calculatedDistance = 500
    } else if (distanceFilterd > 5 && distanceFilterd <= 15) {
      calculatedDistance = distanceFilterd * 100
    } else {
      let remainingDistance = distanceFilterd - 15
      calculatedDistance = ((20 * 100) + (remainingDistance * 50))
    }
  } else if (unit === 'm') {
    calculatedDistance = 500
  } else {
    return
  }

  return priceToNaira(calculatedDistance)
}
