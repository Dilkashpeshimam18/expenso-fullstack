const Expense = require('../models/expense')
const Users = require('../models/users')
const sequelize = require('../utils/db')

exports.showLeaderboard = async (req, res) => {
   try {

      const leaderBoardData = await Users.findAll({
         attributes: ['id', 'name',
            [sequelize.fn('sum', sequelize.col('amount')), 'total_expense']],
         include: [
            {
               model: Expense,
               attributes: []
            }
         ],
         group: ['id'],
         order: [['total_expense', 'DESC']]

      })


      res.status(200).json({ succes: true, data: leaderBoardData })
   } catch (err) {
      console.log(err)
      res.status(500).json({ success: false, err })

   }


}