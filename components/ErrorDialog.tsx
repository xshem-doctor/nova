// components/ErrorDialog.tsx
import React from 'react';
import { Dialog, Portal, Button, Text } from 'react-native-paper';

type Props = {
  visible: boolean;
  message: string;
  onDismiss: () => void;
};
export default function ErrorDialog({ visible, message, onDismiss }: Props) {

  return (
    <Portal>
    <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title ><Button icon="message-alert-outline">تنويه</Button></Dialog.Title>
        <Dialog.Content>
        <Text>{message}</Text>
        </Dialog.Content>
        <Dialog.Actions>
        <Button onPress={onDismiss}>حسناً</Button>
        </Dialog.Actions>
    </Dialog>
</Portal>

  );
};
