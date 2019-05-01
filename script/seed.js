'use strict'

const db = require('../server/db')
const {User, Playlist, Room} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'platy@email.com', password: '123', firstName: 'Patty', lastName: 'Platypusowitz'}),
    User.create({email: 'Okapi@canopyForest.com', password: '123', firstName: 'Cappy', lastName: 'O'Kapi}),
    User.create({email: 'Bear@forest.com', password: '123', firstName: 'Bear', lastName: 'Bearsmith'}),
    User.create({email: 'Elephant@savanah.com', password: '123', firstName: 'Elle', lastName: 'Elephante'}),
    User.create({email: 'Panda@schina.com', password: '123', firstName: 'Paul', lastName: 'Panderson'}),
])
  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)

const rooms = await Promise.all([
  //Previous room now closed
  Room.create({roomId: 1, host: 4, roomCode: 'AAAA', Users: 1, closed: true}),
  Room.create({roomId: 1, host: 4, roomCode: 'AAAA', Users: 4, closed: true}),
  //Open room 1
  Room.create({roomId: 2, host: 1, roomCode: 'BBBB', Users: 1, closed: false}),
  Room.create({roomId: 2, host: 1, roomCode: 'BBBB', Users: 2, closed: false}),
  //Open Room 2
  Room.create({roomId: 3, host: 3, roomCode: 'CCCC', Users: 3, closed: false}),
  Room.create({roomId: 3, host: 3, roomCode: 'CCCC', Users: 4, closed: false}),
])
console.log(`seeded ${rooms.length} rooms`)
console.log(`seeded successfully`)

const playlists = await Promise.all([
  Playlist.create({roomId:1 , songId:111111 , playOrder:1 , user: 1 }),
  Playlist.create({roomId:1 , songId:122222 , playOrder:2 , user: 1}),
  Playlist.create({roomId:1 , songId:133333 , playOrder:3 , user: 1}),
  Playlist.create({roomId:1 , songId:144444 , playOrder:4 , user: 4}),
  Playlist.create({roomId:2 , songId:155555 , playOrder:1 , user: 1}),
  Playlist.create({roomId:2 , songId:166666 , playOrder:2 , user: 1}),
  Playlist.create({roomId:2 , songId:177777 , playOrder:3 , user: 2}),
  Playlist.create({roomId:3 , songId:188888 , playOrder:1 , user: 3}),
  Playlist.create({roomId:3 , songId:166666 , playOrder:2 , user: 4}),
  Playlist.create({roomId:2 , songId:166666 , playOrder:4 , user: 2}),
  Playlist.create({roomId:2 , songId:177777 , playOrder:5 , user: 2}),
  Playlist.create({roomId:3 , songId:111111 , playOrder:3 , user: 3})
])
console.log(`seeded ${playlists.length} playlists`)
}

async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
