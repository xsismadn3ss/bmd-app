import { useThemeColor } from "@/hooks/use-theme-color";
import { ReactNode, useEffect, useState } from "react";
import { Dimensions, Modal, StyleSheet, View } from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

interface DraggableBottomSheetProps {
  children: ReactNode;
  isVisible: boolean;
  onClose: () => void;
  headerHeight?: number;
}

export function DraggableBottomSheet({
  children,
  isVisible = false,
  onClose,
  headerHeight = 0,
}: DraggableBottomSheetProps) {
  const SHEET_HEIGHT =
    headerHeight > 0 ? SCREEN_HEIGHT - headerHeight : SCREEN_HEIGHT * 0.5;

  const [showModal, setShowModal] = useState(isVisible);

  const translateY = useSharedValue(SHEET_HEIGHT);
  const context = useSharedValue({ y: 0 });

  const backgroundColor = useThemeColor(
    { light: "#f7f7f7", dark: "#111111" },
    "background"
  );

  useEffect(() => {
    if (isVisible) {
      setShowModal(true);
      translateY.value = withTiming(0, { duration: 350 });
    } else {
      translateY.value = withTiming(SHEET_HEIGHT, { duration: 350 }, (finished) => {
        if (finished) {
          runOnJS(setShowModal)(false);
        }
      });
    }
  }, [isVisible, SHEET_HEIGHT]); // Dependemos de isVisible

  const panGesture = Gesture.Pan()
    .onStart(() => {
      context.value = { y: translateY.value };
    })
    .onUpdate((event) => {
      translateY.value = Math.max(context.value.y + event.translationY, 0);
    })
    .onEnd((event) => {
      if (event.translationY > SHEET_HEIGHT * 0.2) {
        translateY.value = withTiming(SHEET_HEIGHT, { duration: 350 }, () => {
          runOnJS(onClose)();
        });
      } else {
        translateY.value = withTiming(0, { duration: 350 });
      }
    });

  const sheetAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  const backdropAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        translateY.value,
        [0, SHEET_HEIGHT],
        [1, 0],
        Extrapolation.CLAMP
      ),
    };
  });

  return (
    <Modal
      // 4. USAMOS EL ESTADO INTERNO, NO EL PROP DIRECTAMENTE
      visible={showModal} 
      transparent={true}
      animationType="none"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={styles.overlayContainer}>
          <GestureDetector
            gesture={Gesture.Tap().onEnd(() => runOnJS(onClose)())}
          >
            <Animated.View style={[styles.backdrop, backdropAnimatedStyle]} />
          </GestureDetector>

          <GestureDetector gesture={panGesture}>
            <Animated.View
              style={[
                styles.bottomSheet,
                sheetAnimatedStyle,
                { height: SHEET_HEIGHT, backgroundColor },
              ]}
            >
              <View style={styles.dragHandle} />
              {children}
            </Animated.View>
          </GestureDetector>
        </View>
      </GestureHandlerRootView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlayContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  bottomSheet: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 10,
    padding: 20,
  },
  dragHandle: {
    alignSelf: "center",
    width: 40,
    height: 5,
    backgroundColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
  },
});