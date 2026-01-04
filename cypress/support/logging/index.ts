let buffer: string[] = []

export function registerLogging(): void {
  Cypress.on('command:start', (cmd) => {
    buffer.push(cmd.name)
    if (buffer.length > 20) buffer.shift()
  })

  Cypress.on('fail', (err) => {
    console.log('--- FAILURE TIMELINE ---')
    buffer.forEach((c) => console.log(c))
    throw err
  })
}
