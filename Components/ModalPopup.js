import { View, Text, Modal, StyleSheet, TouchableOpacity, Animated } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'


const ModalPopup = ({visible, children}) => {
  const [showModal, setShowModal] = useState(visible);

  // For animation when opening
  const scaleValue = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    toggleModal();
  }, [visible])

  const toggleModal = () => {
        if (visible) {
            setShowModal(true);
            Animated.spring(scaleValue, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start();
        } else {
            setTimeout(() => setShowModal(false), 200);            
            Animated.timing(scaleValue, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,                    
            }).start();
        }
    }

  return (

    <Modal transparent visible={showModal}>
        <View style={styles.modalBackGround}>
            <Animated.View style={[styles.modalContainer, {transform: [{scale: scaleValue}]}]}>             
             {children}
            </Animated.View>
        </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
    modalBackGround: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center"
    },
    modalContainer: {
        width: "80%",
        backgroundColor: "#ffffff",
        paddingHorizontal: 20,
        paddingVertical: 30,
        borderRadius: 20,
        elevation: 20
    }
});

export default ModalPopup