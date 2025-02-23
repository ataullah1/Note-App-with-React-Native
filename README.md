# Notepad App with Native Features

A modern, feature-rich notepad application built with Expo and React Native, offering a seamless note-taking experience across multiple platforms.

## Features

- **Rich Text Editing**: Advanced text editing capabilities using Lexical and Pell Rich Editor
- **Native Integration**: Leverages native features for a smooth user experience
- **Theme Support**: Dynamic theming with automatic light/dark mode switching
- **Haptic Feedback**: Enhanced user interaction with haptic responses
- **Cross-Platform**: Works seamlessly on iOS, Android, and Web platforms
- **Gesture Support**: Intuitive gesture controls for better navigation
- **Safe Storage**: Secure note storage using AsyncStorage

## Getting Started

### Prerequisites

- Node.js (LTS version recommended)
- npm or pnpm package manager
- Expo CLI
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

### Installation

1. Install project dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npx expo start
```

You'll see options to run the app in:

- [Development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go)

## Project Structure

- `/app`: Main application screens and routing
- `/components`: Reusable UI components
- `/constants`: Global constants and theme configurations
- `/hooks`: Custom React hooks
- `/types`: TypeScript type definitions
- `/assets`: Images, fonts, and other static resources

## Development

### Starting Fresh

To start with a clean slate:

```bash
npm run reset-project
```

This will move the starter code to `/app-example` and create a new `/app` directory for your development.

### Key Components

- `NoteList`: Manages the display and organization of notes
- `FloatingActionButton`: Quick action button for note creation
- `ThemedView/Text`: Theme-aware components for consistent styling
- `ParallaxScrollView`: Enhanced scrolling experience
- `RichTextField`: Advanced text editing capabilities

### Testing

Run the test suite:

```bash
npm test
```

## Technologies

- [Expo](https://expo.dev/): Development framework
- [React Native](https://reactnative.dev/): Cross-platform UI
- [Lexical](https://lexical.dev/): Text editor framework
- [React Navigation](https://reactnavigation.org/): Navigation library
- [Expo Router](https://docs.expo.dev/router/introduction/): File-based routing

## Learn More

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the 0BSD License.
