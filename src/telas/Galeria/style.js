import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#E7F1FF',
        flex: 1,
        justifyContent: "center",
    },
    pagina: {
        flexDirection: 'row',
        height: 64,
        alignSelf: "center" 
    },
    dot: {
        height: 10,
        borderRadius: 5,
        backgroundColor: '#D9D9D9',
        marginHorizontal: 8,
    },
    itensContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    itensImage: {
        flex: 0.9,
        justifyContent: 'center'
    }
})

export default styles;