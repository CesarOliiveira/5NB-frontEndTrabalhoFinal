import React from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';

interface DismissKeyboardProps {
    children: React.ReactNode;
}

export const DismissKeyboard: React.FC<DismissKeyboardProps> = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
); 