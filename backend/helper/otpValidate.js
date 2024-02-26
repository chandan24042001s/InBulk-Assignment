const otpVerification = async (otpTime)=>{
    try{

        console.log('Miliseconds is: '+ otpTime)

        const cDateTime = new Date();
        let differenceValue = (otpTime - cDateTime.getTime())/1000

        differenceValue /= 60

        const minutes = Math.abs(differenceValue)
        console.log(`Expired Minutes ${minutes}`)

        if(minutes > 10){
            return true
        }

        return false
    }
    catch(error){
        console.log(error.message)
    }
}

module.exports = otpVerification