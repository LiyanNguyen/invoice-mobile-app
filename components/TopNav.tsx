import { Pressable, StyleSheet, View } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'

const TopNav = () => {
  const router = useRouter()

  const goToSettings = () => {
    router.push('/settings')
  }
  return (
    <View style={styles.topNav}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require('../assets/images/logo.svg')} contentFit='contain' />
      </View>
      <View style={styles.topNav_RightSide}>
        <Image style={styles.themeSwitcherIcon} source={require('../assets/images/icon-moon.svg')} />
        <View style={styles.divider} />
        <Pressable onPress={goToSettings}>
          <Image style={styles.userAvatar} source={require('../assets/images/image-avatar.jpg')} />
        </Pressable>
      </View>
    </View>
  )
}

export default TopNav

const styles = StyleSheet.create({
  topNav: {
    height: 72,
    backgroundColor: '#373B53',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoContainer: {
    height: '100%', width: 72, backgroundColor: '#7C5DFA', display: 'flex', alignItems: 'center', justifyContent: 'center', borderTopRightRadius: 20, borderBottomRightRadius: 20
  },
  logo: {
    width: 26,
    height: 26
  },
  topNav_RightSide: {
    height: '100%', flexDirection: 'row', alignItems: 'center', gap: 24
  },
  themeSwitcherIcon: {
    width: 20, height: 20
  },
  divider: {
    height: '100%', width: 1, backgroundColor: '#494E6E'
  },
  userAvatar: {
    width: 32, height: 32, borderRadius: 16, marginRight: 24
  },
})