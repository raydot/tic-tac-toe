#!/usr/bin/env node

import chalk from "chalk"
import inquirer from "inquirer"
// import gradient from "gradient-string"
import { pastel } from "gradient-string"
import chalkAnimation from "chalk-animation"
import figlet from "figlet"
import { createSpinner } from "nanospinner"

console.log(chalk.bgGreen("Dave Rules!"))

let someName = "Dave"

const sleep = (ms = 2000) => new Promise((resolve) => setTimeout(resolve, ms))

async function welcome() {
  const rainbowTitle = chalkAnimation.rainbow("Welcome to the Dave Rules!")

  await sleep()
  rainbowTitle.stop()

  console.log(`
      ${chalk.bgBlue("THE RULES OF DAVE")}
      Dave is a man
      who can understand
      how a man's ${chalk.red("got to do")}
      whatever he can.
    `)
}

async function askName() {
  const responses = await inquirer.prompt([
    {
      name: "name",
      type: "input",
      message: "Who rules?",
      default() {
        return "Default = Dave"
      },
    },
  ])

  someName = responses.name
}

async function question1() {
  const answers = await inquirer.prompt([
    {
      name: "question_1",
      type: "list",
      message: "What is your favorite color?\n",
      choices: ["Red", "Blue", "Green", "Dave", "Yellow"],
    },
  ])

  // return answers.question_1 === "Dave"
  return handleAnswer(answers.question_1 === "Dave")
}

async function handleAnswer(isCorrect) {
  const spinner = createSpinner("Checking your answer...").start()

  await sleep()

  if (isCorrect) {
    spinner.success({
      text: `Phat shot ${someName}!  You ken the way of Dave.`,
    })
  } else {
    spinner.error({ text: "You are not worthy of the Dave." })
    process.exit(1)
  }
}

function winner() {
  console.clear()
  const msg = `Congratulations ${someName}!\nYou are just so Dave!`

  figlet(msg, (err, data) => {
    console.log(pastel.multiline(data))
  })
}

await welcome()
await askName()
await question1()
winner()
