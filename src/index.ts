import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import _ from 'lodash'

const app = express()

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

mongoose.connect('mongodb://localhost:27017/todolistDB')

const itemsSchema = new mongoose.Schema({
  name: String,
})

const Item = mongoose.model('Item', itemsSchema)

const item1 = new Item({
  name: 'Welcome to your todolist!',
})

const item2 = new Item({
  name: 'Hit the + button to add a new item.',
})

const item3 = new Item({
  name: '<-- Hit this to delete an item.',
})

const defaultItems = [item1, item2, item3]

const listSchema = new mongoose.Schema({
  name: String,
  items: [itemsSchema],
})

const List = mongoose.model('List', listSchema)

app.get(
  '/',
  function (
    req: any,
    res: {
      redirect: (arg0: string) => void
      render: (
        arg0: string,
        arg1: { listTitle: string; newListItems: any }
      ) => void
    }
  ) {
    Item.find()
      .then((foundItems: string | any[]) => {
        // console.log(foundItems);

        if (foundItems.length === 0) {
          Item.insertMany(defaultItems)
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            .then((_results: any) => {
              console.log('Documents inserted successfully')
            })
            .catch((err: any) => {
              console.error(err)
            })
          res.redirect('/')
        } else {
          res.render('list', { listTitle: 'Today', newListItems: foundItems })
        }
      })
      .catch((err: any) => {
        console.error(err)
      })
  }
)

app.get(
  '/:customListName',
  function (
    req: { params: { customListName: any } },
    res: {
      redirect: (arg0: string) => void
      render: (
        arg0: string,
        arg1: { listTitle: any; newListItems: any }
      ) => void
    }
  ) {
    const customListName = _.capitalize(req.params.customListName)

    List.findOne({ name: customListName })
      .then((foundList: { name: any; items: any }) => {
        if (!foundList) {
          // Create a new list
          const list = new List({
            name: customListName,
            items: defaultItems,
          })
          list.save()
          res.redirect('/' + customListName)
        } else {
          // show an existing list
          res.render('list', {
            listTitle: foundList.name,
            newListItems: foundList.items,
          })
        }
      })
      .catch((err: any) => {
        console.error(err)
      })
  }
)

app.post(
  '/',
  function (
    req: { body: { newItem: any; list: any } },
    res: { redirect: (arg0: string) => void }
  ) {
    const itemName = req.body.newItem
    const listName = req.body.list
    const item = new Item({
      name: itemName,
    })

    if (listName === 'Today') {
      item.save()
      res.redirect('/')
    } else {
      List.findOne({ name: listName })
        .then((foundList: { items: any[]; save: () => void }) => {
          foundList.items.push(item)
          foundList.save()
          res.redirect('/' + listName)
        })
        .catch((err: any) => {
          console.error(err)
        })
    }
  }
)

app.post(
  '/delete',
  function (
    req: { body: { checkbox: any; listName: any } },
    res: { redirect: (arg0: string) => void }
  ) {
    const checkedItemId = req.body.checkbox
    const listName = req.body.listName

    if (listName === 'Today') {
      Item.findByIdAndDelete(checkedItemId)
        .then(() => {
          console.log('succesfully deleted checked Item.')
        })
        .catch((err: any) => {
          console.error(err)
        })
      res.redirect('/')
    } else {
      List.findOneAndUpdate(
        { name: listName },
        {
          $pull: {
            items: {
              _id: checkedItemId,
            },
          },
        }
      )
        .then((foundList: any) => {
          if (foundList) {
            res.redirect('/' + listName)
          } else {
            console.log('Error updating list')
          }
        })
        .catch((err: any) => {
          console.error(err)
        })
    }
  }
)

app.get(
  '/about',
  function (_req: any, res: { render: (arg0: string) => void }) {
    res.render('about')
  }
)

app.listen(3000, function () {
  console.log('Server started on port 3000')
})
