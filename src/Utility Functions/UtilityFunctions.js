// Update the form values
export function handler(setHook, keyName, value) {
    setHook(e => ({
        ...e,
        [keyName]: value
    }));
}

// Returns largest key + 1
export function generateNewKey(tripArray) {
    let maxKeyValue = Math.max(...tripArray.map(item => item.id));
    return tripArray.length ? maxKeyValue + 1 : 1;
}