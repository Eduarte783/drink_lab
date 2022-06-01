table: users

email: VARCHAR(255)
password: VARCHAR(255)

sequelize model:create --name user --attributes email:string,password:string

table: drinks

sequelize model:create --name drink --attributes idDrink:integer,drinkName:string,drinkIngredient:string

sequelize model:create --name fave --attributes idDrink:integer,drinkName:string,userId:string