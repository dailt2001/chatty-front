const useSessionStorage = (key, type) => {
    try {
        if (type === 'get') {
            const item = window.sessionStorage.getItem(key);
            return item ? JSON.parse(item) : '';
        } else if (type === 'set') {
            const setValue = (newValue) => {
                window.sessionStorage.setItem(key, JSON.stringify(newValue));
            };
            return [setValue]; // func
        } else {
            const deleteValue = () => {
                window.sessionStorage.removeItem(key);
            };
            return [deleteValue];
        }
    } catch (error) {
        console.log(error);
    }
};

export default useSessionStorage;
// data in session storage is string
// Vd: const username = useSessionStorage('username', 'get')
// Vd: const [setUsername] = useSessionStorage('username', 'set')
// setUsername('Martin') delete<=>set => deleteUsername()
