export const validateParty = values => {
    const errors = {}
    if (!values.partyName) {
        errors.partyName = 'Required'
    }

    if (values.partyName && values.partyName.length > 30) {
        errors.partyName = 'Must be 30 characters or less'
    }

    if (!values.address) {
        errors.address = 'Required';
    }
    return errors
}

export const validatePurchase = values => {
    const errors = {}
    if (!values.partyName) {
        errors.partyName = 'Required'
    }

    if (values.partyName && values.partyName.length > 30) {
        errors.partyName = 'Must be 30 characters or less'
    }

    if (!values.address) {
        errors.address = 'Required';
    }
    return errors
}
