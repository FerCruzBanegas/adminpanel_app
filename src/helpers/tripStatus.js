export function status(status) {
    if(status == 'completed') {
        return 'Completed'
    } else if (status == 'approved') {
        return 'Approved'
    } else if (status == 'declined') {
        return 'Declined'
    } else if (status == 'approved') {
        return 'Approved'
    } else if (status == 'started') {
        return 'Started'
    } else if (status == 'cancelledByUser') {
        return 'Cancelled By User'
    } else if (status == 'cancelledByPartner') {
        return 'Cancelled By Partner'
    } else if (status == 'completed') {
        return 'Completed'
    } else if (status == 'expired') {
        return 'Expired'
    } 
}