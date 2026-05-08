// src/components/TabIcon.js
import React from "react";
import { Image, View } from "react-native";
import PropTypes from 'prop-types';

const TabIcon = ({ source, focused, label }) => {
  return (
    <View
      style={{
        paddingVertical: 6,
      }}
      accessibilityLabel={`${label} tab`}
      accessibilityRole="tab"
      accessibilityState={{ selected: focused }}
    >
      <Image
        source={source}
        style={{
          width: 24,
          height: 24,
          tintColor: focused ? "#4A90E2" : "#A9A9A9",
        }}
        accessibilityRole="image"
      />
    </View>
  );
};

TabIcon.propTypes = {
  source: PropTypes.number.isRequired,
  focused: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
};

export default TabIcon;
