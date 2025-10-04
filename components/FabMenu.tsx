// components/FabMenu.tsx
import React, { useState } from 'react';
import { FAB, Portal } from 'react-native-paper';

interface FabAction {
  icon: string;
  label?: string;
  onPress: () => void;
}

interface FabMenuProps {
  actions: FabAction[];
  mainIcon?: string;
  expandedIcon?: string;
  visible?: boolean;
  position?: 'bottom-right' | 'bottom-left';
}



const FabMenu: React.FC<FabMenuProps> = ({
  actions,
  mainIcon = 'plus',
  expandedIcon = 'close',
  visible = true,
  position = 'bottom-right', // ✅ Add this line
}) => {

  const [open, setOpen] = useState(false);
    const getPositionStyle = () => {
  return position === 'bottom-left'
    ? { left: 16, right: undefined }
    : { right: 16, left: undefined };
};

  return (
        <Portal>
        <FAB.Group
            open={open}
            visible={visible}
            icon={open ? expandedIcon : mainIcon}
            actions={actions}
            onStateChange={({ open }) => setOpen(open)}
            style={[{ position: 'absolute', bottom: 80 }, getPositionStyle()]}
            theme={{ colors: { backdrop: 'transparent' } }} // ✅ disables background overlay
            onPress={() => {
            if (open) {
                // Optional: handle tap when menu is open
            }
            }}
        />
        </Portal>

  );
};

export default FabMenu;
