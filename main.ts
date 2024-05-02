#! /usr/bin/env node

import inquirer from 'inquirer';
import chalk from 'chalk';

let myBalance = 5000; // Initial balance
const myPin = 1234; // PIN for authentication

async function startATM() {
  console.log(chalk.blue('Welcome to ATM - ATM Machine'));

  const pinAnswer = await inquirer.prompt([
    {
      type: 'input',
      name: 'pin',
      message: 'Enter your PIN',
      validate: (input) => {
        if (isNaN(parseInt(input))) {
          return 'PIN must be a number';
        }
        return true;
      },
    },
  ]);

  const enteredPin = parseInt(pinAnswer.pin);

  if (enteredPin === myPin) {
    console.log(chalk.green('PIN is correct, login successful!'));
    console.log(chalk.yellow(`Current account balance is $${myBalance}`));

    let running = true;

    while (running) {
      const operationAns = await inquirer.prompt([
        {
          type: 'list',
          name: 'operation',
          message: 'What would you like to do?',
          choices: [
            'Check Balance',
            'Withdraw',
            'Deposit',
            'Exit',
          ],
        },
      ]);

      switch (operationAns.operation) {
        case 'Check Balance':
          console.log(chalk.yellow(`Your balance is $${myBalance}`));
          break;

        case 'Withdraw':
          const withdrawAmount = await inquirer.prompt([
            {
              type: 'input',
              name: 'amount',
              message: 'Enter the amount to withdraw:',
              validate: (input) => {
                const amount = parseFloat(input);
                if (isNaN(amount)) {
                  return 'Please enter a valid number';
                }
                return true;
              },
            },
          ]);

          const withdraw = parseFloat(withdrawAmount.amount);

          if (withdraw > myBalance) {
            console.log(chalk.red('Insufficient balance to withdraw that amount.'));
          } else {
            myBalance -= withdraw;
            console.log(chalk.green(`Withdrawal successful! New balance is $${myBalance}`));
          }
          break;

        case 'Deposit':
          const depositAmount = await inquirer.prompt([
            {
              type: 'input',
              name: 'amount',
              message: 'Enter the amount to deposit:',
              validate: (input) => {
                const amount = parseFloat(input);
                if (isNaN(amount) || amount <= 0) {
                  return 'Please enter a valid positive number';
                }
                return true;
              },
            },
          ]);

          const deposit = parseFloat(depositAmount.amount);
          myBalance += deposit;
          console.log(chalk.green(`Deposit successful! New balance is $${myBalance}`));
          break;

        case 'Exit':
          console.log(chalk.cyan('Thank you for using the ATM. Goodbye!'));
          running = false;
          break;

        default:
          console.log(chalk.red('Invalid choice.'));
          break;
      }
    }
  } else {
    console.log(chalk.red('Incorrect PIN. Access denied.'));
  }
}

startATM();
