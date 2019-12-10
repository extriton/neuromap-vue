export default {
    
    getMeetingStatus (startAt, endAt) {
        const now = new Date()
        let status = 0

        if (now.getTime() >= startAt.getTime() && now.getTime() <= endAt.getTime()) {
            status = 1
        }
        if (now.getTime() > endAt.getTime()) {
            status = 2
        }
        console.log('status = ' + status)
        return status
    }

}