# INVENTORY SYSTEM AND POS SYSTEM

## Members
```
-John Paul Vistal
-Antonette Biore
-Rose Marry Goyo

```

## Set up the project
```
npm install
```

```
create mongoDB named inventory-system
create three collections 
    products
    sales
    users


>>Insert this to users collection
{
"username" : "sample",
"password" : "p@ssw0rd",
"level" : "admin",
"fullname" : "Initial User",
"email" : "sample@gmail.com",
"gender" : "male",
"birthDate" : "01-01-2000",
"img" : "default1.jpg",
"createdAt" : "01-01-2000",
"updatedAt" : "01-01-2000"
}
Add one user with admin user level before you delete the initial user

>>Insert this to product Collection
{
"img" : "shoes-3.png",
"product_number" : 10000000,
"product_name" : "Sample Product 1",
"brand" : "Sample",
"price" : 0,
"qty" : 10,
"created_at" : "11-3-2020 :: 14 : 0 : 39",
"updated_at" : "11-3-2020 :: 14 : 0 : 39",
"created_by" : "Initial User",
"updated_by" : "Initial User"
}
Add one product before you delete the initial product

>>Insert this to sales Collection
{
 "products" : [{
        "id" : 0,
        "prodID" : "5f9966d4f85da70bc46363ed",
        "productNumber" : 10000000,
        "productName" : "Sample Product 1,
        "price" : 0,
        "qty" : 1,
        "total" : 0}],
    "dateRecorded" : "2020-11-03T11:49:04.796Z",
    "invoiceNumber" : 1000000000,
    "numberOfItems" : 1,
    "total" : 0,
    "cashTendered" : 0,
    "change" : 0
}

Add one transaction record before deleting the initial sales record.

```

## User Level Scope

```
Admin - Access All the fields in Inventory System
Manager - Can only access products , stocks and sales
Cashier -  Can access the POS
```


## Run the project
```
npm start
```
