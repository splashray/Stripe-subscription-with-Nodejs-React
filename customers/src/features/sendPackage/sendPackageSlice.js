import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  packageForm: 'hidden',
  items: {
    item1: {
      pickupAddress: '',
      deliveryAddress: '',
      metrics: {
        distance: '',
        duration: '',
      },
      packageSizeChoice: {
        small: false,
        medium: true,
        heavy: false,
      },
      additionalAddress: '',
      description: '',
      value: '',
      tel: '',
      otherTel: '',
      image: '',
      recieverName: '',
      recieverTel: '',
      price: '',
    },
  }
}

const sendPackageSlice = createSlice({
  name: 'sendPackage',
  initialState,
  reducers: {
    changePackageFormWindow: (state) => {
      if (state.packageForm === 'hidden') {
        state.packageForm = 'block'
      } else {
        state.packageForm = 'hidden'
      }
    },
    changePackageSize: (state, { payload }) => {
      const { itemNo, packageSize } = payload
      switch (itemNo) {
        case 'item1':
          switch (packageSize) {
            case 'small':
              state.items.item1.packageSizeChoice.small = true
              state.items.item1.packageSizeChoice.medium = false
              state.items.item1.packageSizeChoice.heavy = false
              break;
            case 'medium':
              state.items.item1.packageSizeChoice.small = false
              state.items.item1.packageSizeChoice.medium = true
              state.items.item1.packageSizeChoice.heavy = false
              break;
            case 'heavy':
              state.items.item1.packageSizeChoice.small = false
              state.items.item1.packageSizeChoice.medium = false
              state.items.item1.packageSizeChoice.heavy = true
              break;
          }
          break;
        case 'item2':
          state.packageSizeChoice.small = false
          state.packageSizeChoice.heavy = false
          state.packageSizeChoice.medium = true
          break;
        case 'item3':
          state.packageSizeChoice.small = false
          state.packageSizeChoice.medium = false
          state.packageSizeChoice.heavy = true
          break;

        default:
          break;
      }
    },
    updateItemMetrics: (state, { payload }) => {
      const { itemNo, distance, duration } = payload
      switch (itemNo) {
        case 'item1':
          state.items.item1.metrics.distance = distance
          state.items.item1.metrics.duration = duration
          break;

        default:
          break;
      }
    },
    updatePrice: (state, { payload }) => {
      const { itemNo, price } = payload
      switch (itemNo) {
        case 'item1':
          state.items.item1.price = price
          break;

        default:
          break;
      }
    },
    updateItemForm: (state, { payload }) => {
      const { itemNo, inputType, inputValue } = payload
      switch (itemNo) {
        case 'item1':
          switch (inputType) {
            case 'pickup':
              state.items.item1.pickupAddress = inputValue
              break;
            case 'delivery':
              state.items.item1.deliveryAddress = inputValue
              break;
            case 'addAddress':
              state.items.item1.additionalAddress = inputValue
              break;
            case 'description':
              state.items.item1.description = inputValue
              break;
            case 'value':
              state.items.item1.value = inputValue
              break;
            case 'tel':
              state.items.item1.tel = inputValue
              break;
            case 'otherTel':
              state.items.item1.otherTel = inputValue
              break;
            case 'image':
              state.items.item1.image = inputValue
              break;
            case 'recieverName':
              state.items.item1.recieverName = inputValue
              break;
            case 'recieverTel':
              state.items.item1.recieverTel = inputValue
              break;
          }
          break;

        default:
          break;
      }
    }
  }
})

export const {
  changePackageFormWindow,
  changePackageSize,
  updateItemMetrics,
  updateItemForm,
  updatePrice
} = sendPackageSlice.actions

export default sendPackageSlice.reducer