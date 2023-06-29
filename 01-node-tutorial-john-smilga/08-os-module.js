const os = require('os')

// info about current user
const user = os.userInfo()
console.log(user)

// method returns the system uptime in seconds
console.log(`The System Uptime is ${os.uptime()} seconds`)

const currentOS = {
  name: os.type(),
  release: os.release(),
  totalMem: os.totalmem(),
  freeMem: os.freemem(),
}

console.log(currentOS)
console.log(`total_mem_in_gb:`, currentOS.totalMem/1024/1024/1024)
console.log(`free_mem_in_gb:`, currentOS.freeMem/1024/1024/1024)
