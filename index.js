const inquirer = require('inquirer')
const cTable = require('console.table')
const mysql = require('mysql')
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Greblat2',
    port: 3306,
    database: 'employee_db'

})

connection.connect((err) => {
    if (err) throw err;

})

const createNew = function () {
    inquirer.prompt(
        { type: raw }
    )
}

const employeeQuery = 'select * from employee'
const employeeCall = connection.query(employeeQuery, (err, res) => {
    return res
})
const roleQuery = 'select * from role'
const roleCall = () => {
    connection.query(roleQuery, (err, res) => {
        return res

    })
}
const add = function () {




    inquirer.prompt(
        {
            type: 'rawlist',
            name: 'choice',
            message: 'What would you like to add?',
            choices: ['Employee', 'Role', 'Department']
        }
    ).then(({ choice }) => {
        if (choice === 'Role') {
            connection.query('select * from department', (err, res) => {

                inquirer
                    .prompt(
                        [{
                            type: 'input',
                            name: 'name',
                            message: 'Role Title?',


                        },
                        {
                            type: 'input',
                            name: 'salary',
                            message: 'Annual Salary??',
                        },
                        {
                            type: 'rawlist',
                            name: 'department',
                            message: 'What department?',
                            choices: function () {
                                var choicesArr = []
                                for (each of res) {
                                    choicesArr.push(each.name)
                                }
                                return choicesArr
                            }
                        }]
                    ).then(({ name, salary, department }) => {
                        console.log(name, salary, department)
                        for (each of res) {
                            if (each.name === department) {
                                var departmentId = each.id
                            }

                        }
                        connection.query('select id from role', (err, roleRes) => {
                            var Id = roleRes.length + 1;
                            console.log(Id)
                            connection.query('insert into role set ?', {
                                id: Id,
                                title: name,
                                salary: salary,
                                department_id: departmentId
                            }, (err) => {
                                if (err) throw err;
                                console.log('Made the new role in the database!')
                            }
                            )
                        }
                        )



                    })

            })
        }
        else if (choice === 'Employee') {
            connection.query('select * from role', (err, res) => {
                inquirer
                    .prompt([{
                        type: 'input',
                        name: 'firstName',
                        message: 'First Name please.'

                    }, {
                        type: 'input',
                        name: 'lastName',
                        message: 'Last Name please'
                    }, {
                        type: 'rawlist',
                        name: 'role',
                        message: 'What is the new employees role?',
                        choices: function () {
                            var choicesArr = []
                            for (each of res) {
                                choicesArr.push(each.title)

                            }
                            return choicesArr
                        }
                    },
                    {
                        type: 'input',
                        name: 'manager',
                        message: "New employee's manager?",

                    }]).then(({ firstName, lastName, role, manager }) => {
                        for (each of res) {
                            if (each.title === role) {
                                var roleId = each.id
                            }

                        }
                        connection.query('insert into employee set?', {
                            first_name: firstName,
                            last_name: lastName,
                            role_id: roleId,
                            manager_id: manager

                        },()=>{
                            run()
                        })
                    }

                    )
            })




        }
        else if (choice === 'Department') {
            connection.query(`select * from department `, (err, res) => {
                var id = res.length + 11
                inquirer
                    .prompt(
                        {
                            type: 'input',
                            name: 'title',
                            message: 'Name of the new Department?',

                        }
                    ).then(({ title }) => {
                        connection.query(`insert  into department set ? `, {
                            id: id,
                            name: title
                        }, (err) => {
                            if (err) throw err;
                           run()
                        })
                    })

            })
        }
        else {
            console.log('nope')
        }
    })
}
const render = function () {
    inquirer
        .prompt(
            {
                type: 'rawlist',
                name: 'choice',
                message: 'What would you like to render?',
                choices: ['Role', 'Employee', 'Department']
            }
        ).then(({ choice }) => {
            let choiceLower = choice.toLowerCase()
            let query = `select * from ${choiceLower}`
            connection.query(query, (err, res) => {
               run()
            })


        })
}
const update = function () {
    connection.query('select * from role', (errr, roleRes) => {
        var roleArr = []
        for (each of roleRes) {
            roleArr.push(`${each.title} ${each.id}`)
        }
        connection.query('select * from employee', (err, res) => {

            inquirer
                .prompt([
                    {
                        type: 'rawlist',
                        name: 'employee',
                        message: 'Please choose an employee.',
                        choices: function () {
                            var choicesArr = []
                            for (each of res) {
                                choicesArr.push(`${each.first_name} ${each.last_name} ${each.id}`)

                            }
                            return choicesArr
                        }
                    },
                    {
                        type: 'rawlist',
                        name: 'role',
                        message: 'New role?',
                        choices: roleArr

                    },]
                ).then(({ employee, role }) => {

                    console.log(employee)
                    var rolesplit = role.split(' ')
                    var roleId = rolesplit[1]
                    var splitEmp = employee.split(' ')
                    var name = parseInt(splitEmp[2])
                    console.log(name)

                    connection.query(`update employee set role_id =? where id = ?`, [roleId, name], (error, results) => {
                        if (error) throw error
                        console.log(results)
                        run()
                    })



                })
        })
    })
}
const run = function () {
    inquirer
        .prompt(
            {
                type: 'rawlist',
                name: 'choice',
                message:'Welcome what would you like to do today?',
                choices:['Add to database','Render database','Update employee role','EXIT']
            }
        ).then(({choice})=>{
            if(choice === 'Add to database' ){
                add()
            }
            if(choice === 'Render database' ){
                render()
            }
            if(choice === 'Update employee role' ){
                update()
            }
            else {
                process.exit(5)
            }
        })
}

// update()
// render()
// add()
run()

