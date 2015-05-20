# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Todo.delete_all

Todo.create(title:"Get milk", body:"buy chocolate milk from Walgreens", done: false)
Todo.create(title:"Get cereal", body:"buy frosted flakes", done: false)
Todo.create(title:"Buy Paper Towels", body:"Charmin Ultra Soft", done: false)
Todo.create(title:"Go to class", body:"See our main man Jeff", done: false)
