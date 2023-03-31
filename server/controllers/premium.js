const Expense = require('../models/expense')
const Users = require('../models/users')

exports.showLeaderboard = async (req, res) => {
   try {
      const allExpense = await Expense.findAll()
      const allUser = await Users.findAll()
      let map = new Map()
      let totalExp = new Map()
      for (let exp of allExpense) {
         map.set(exp.usersdbId, map.get(exp.usersdbId) + exp.amount || exp.amount)

      }
      for (let user of allUser) {
         if (map.has(user.id)) {
            totalExp.set(user.name, map.get(user.id))

         } else {
            totalExp.set(user.name, 0)
         }

      }
      let leaderBoardData = Array.from(totalExp, ([key, value]) => {
         return {
            name: key,
            total_expense: value
         }
      })
      leaderBoardData.sort((a, b) => b.total_expense - a.total_expense)

      res.status(200).json({ succes: true, data: leaderBoardData })
   } catch (err) {
      console.log(err)
      res.status(500).json({ success: false, err })

   }


}