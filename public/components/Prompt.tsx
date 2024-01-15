import React, { useEffect, useRef, useState } from "react";
import { Button, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

type PromptProps = {
    title: string;
    response: Function;
    defaultText: string;
    visible: boolean;
    maxChars: number;
}

const Prompt = (props : PromptProps) => {
    const {title, response, defaultText, visible, maxChars} = props
    const [nameText, setNameText] = useState(defaultText)

    useEffect(() => {
        visible && setNameText(defaultText)
    }, [visible])

    const PromptButton = ({text, onPress}: any) =>
        <TouchableOpacity onPress={onPress} style={styles.button}>
            <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>

    return (
        <Modal visible={visible} transparent={true} animationType="fade">
            <View style={styles.modalContainer}>
                <View style={styles.modal}>
                    <Text style={styles.title}>{title}</Text>
                    <View style={styles.input}>
                        <TextInput
                            onChangeText={(newText) => setNameText(newText)}
                            value={nameText}
                            placeholder={defaultText}
                            maxLength={maxChars ? maxChars : 1000}
                            selectTextOnFocus={true}
                            style={styles.textInput}
                        />
                    </View>
                    <View style={styles.buttons}>
                        <PromptButton
                            text={"Cancel"}
                            onPress={() => response(defaultText)}
                        />
                        <PromptButton
                            text={"Save"}
                            onPress={() => response(nameText)}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 400,
        borderRadius: 10,
    },
    modal: {
        width: "70%",
        height: "50%",
        backgroundColor: 'white',
        borderColor: "#000500",
        borderWidth: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    title: {
        textAlign: "center",
        fontSize: 18,
        margin: 10,
    },
    input: {
        width: "80%",
        backgroundColor: "white",
        borderColor: "#000500",
        borderWidth: 1,
        borderRadius: 5,
        margin: 10,
    },
    textInput: {
        fontSize: 20,
    },
    buttons: {
        position: "absolute",
        bottom: 10,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
        margin: 10,
    },
    button: {
        backgroundColor: "#fdda00",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#000500",
        borderStyle: "solid",
        width: 125,
        height: 40,
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 18,
    }
})

export default Prompt;