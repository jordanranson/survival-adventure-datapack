import { attribute, execute, loot, say } from 'sandstone/commands'
import { Advancement, LootTable, MCFunction, _ } from 'sandstone/core'
import { createObjective } from 'sandstone/variables'

const max_health_obj = createObjective('sa_max_health', 'dummy')

LootTable('heart_fruit', {
  pools: [
    {
      rolls: 1,
      entries: [
        {
          type: 'minecraft:item',
          name: 'minecraft:golden_apple',
          functions: [
            {
              function: 'set_nbt',
              tag: '{"CustomModelData":12345,"sa_heart_fruit":1}'
            },
            {
              function: 'set_name',
              entity: 'this',
              name: 'Heart Fruit'
            }
          ]
        }
      ]
    }
  ]
})

const ate_fruit_adv = Advancement('ate_fruit', {
  criteria: {
    atefruit: {
      trigger: 'minecraft:consume_item',
      conditions: {
        item: {
          item: 'minecraft:golden_apple',
          nbt: '{"sa_heart_fruit":1}'
        }
      }
    }
  },
  rewards: {
    function: 'sa:eat_heart_fruit'
  }
})

MCFunction('eat_heart_fruit', () => {
  const max_health = max_health_obj.ScoreHolder('@s')
  max_health.add(1)
  ate_fruit_adv.revoke('@s')
})

MCFunction('tick_heart_fruits', () => {
  execute.as('@p').at('@s').run(() => {
    const max_health = max_health_obj.ScoreHolder('@s')

    max_health.add(0)

    _.if(max_health.equalTo(0), () => attribute('@s', 'minecraft:generic.max_health').baseSet(10))
    _.if(max_health.equalTo(1), () => attribute('@s', 'minecraft:generic.max_health').baseSet(12))
    _.if(max_health.equalTo(2), () => attribute('@s', 'minecraft:generic.max_health').baseSet(14))
    _.if(max_health.equalTo(3), () => attribute('@s', 'minecraft:generic.max_health').baseSet(16))
    _.if(max_health.equalTo(4), () => attribute('@s', 'minecraft:generic.max_health').baseSet(18))
    _.if(max_health.equalTo(5), () => attribute('@s', 'minecraft:generic.max_health').baseSet(20))
    _.if(max_health.equalTo(6), () => attribute('@s', 'minecraft:generic.max_health').baseSet(22))
    _.if(max_health.equalTo(7), () => attribute('@s', 'minecraft:generic.max_health').baseSet(24))
    _.if(max_health.equalTo(8), () => attribute('@s', 'minecraft:generic.max_health').baseSet(26))
    _.if(max_health.equalTo(9), () => attribute('@s', 'minecraft:generic.max_health').baseSet(28))
    _.if(max_health.equalTo(10), () => attribute('@s', 'minecraft:generic.max_health').baseSet(30))
    _.if(max_health.equalTo(11), () => attribute('@s', 'minecraft:generic.max_health').baseSet(32))
    _.if(max_health.equalTo(12), () => attribute('@s', 'minecraft:generic.max_health').baseSet(34))
    _.if(max_health.equalTo(13), () => attribute('@s', 'minecraft:generic.max_health').baseSet(36))
    _.if(max_health.equalTo(14), () => attribute('@s', 'minecraft:generic.max_health').baseSet(38))
    _.if(max_health.greaterOrEqualThan(15), () => attribute('@s', 'minecraft:generic.max_health').baseSet(40))
  })
}, {
  runEachTick: true
})

// TODO: make something call this
MCFunction('give_heart_fruit', () => {
  loot.give('@s').loot('sa:heart_fruit')
})
