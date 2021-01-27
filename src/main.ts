import { MCFunction } from 'sandstone/core'

MCFunction('main_load', () => {
}, {
  runOnLoad: true
})

MCFunction('main_tick', () => {
}, {
  runEachTick: true
})
