import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from '../../config/appConstants';
import {Header} from '../../component';
import StyledAccordion from '../../component/Accordian';

const faqData = [
  {
    id: 1,
    title:
      "1. What should I do if the blog section keeps loading and doesn't open?",
    content:
      "If you are experiencing issues where the blog section continuously loads and doesn't open, it might be due to the app not having permission to access your device's file manager. This is particularly relevant if you denied permission when prompted upon your first app launch.",
  },
  {
    id: 2,
    title: '2. What happens when I open the app for the first time?',
    content:
      "When you open the app for the first time, it will request permission to access your device's file manager. This permission is necessary for the proper functioning of certain features, including the blog section.",
  },
  {
    id: 3,
    title: '3. What should I do if I accidentally deny file manager access?',
    content:
      `If you mistakenly denied file manager access and are now encountering issues with the blog section not loading, you have a couple of options to resolve the problem:\n\nOption 1: Clear Cache and Data\n\n- Go to your device's settings.\n- Find and select "Apps" (or "Applications" depending on your device).\n- Locate and tap on "Rapid English" from the list of installed apps.\n- Inside the app info screen, select "Storage."\n- You will find options to "Clear Cache" and "Clear Data." Clear both the cache and data.\n- Restart the app and try accessing the blog section again.\n\nOption 2: Uninstall and Reinstall\n\n- If clearing cache and data doesn't resolve the issue, you can uninstall the app from your device.\n- Go to your device's settings.\n- Find and select "Apps" (or "Applications").\n- Locate and tap on "Rapid English."\n- Choose the option to uninstall the app.\n- After uninstalling, visit your device's app store and reinstall the app.\n- Open the app, and upon the first launch, make sure to grant permission to access your device's file manager.\n\nIf the problem persists even after trying these options, please contact our support team for further assistance. We're here to help you get the best experience from our app!`,
  },
  {
    id: 4,
    title: '4. How can I prevent these issues in the future?',
    content:
      "To avoid running into issues with the blog section or other features, always ensure that you grant necessary permissions to the app when prompted. Additionally, keeping your app updated to the latest version will help ensure that you have the best and most stable experience.\nFor any other questions or concerns, feel free to reach out to our support team through contact information. We're dedicated to assisting you and enhancing your app experience",
  },
  {
    id: 5,
    title: `5. What is the "Personal Assistant" feature in Rapid English App?`,
    content: `The "Personal Assistant" is a new AI chat feature that addresses grammar mistakes in your text. It also translates sentences from Hindi to English and provides assistance in clarifying doubts. Additionally, if you phrase a sentence in various ways, it can provide the same meaning in different forms.`,
  },
  {
    id: 6,
    title: `6. How does the grammar correction feature work?`,
    content: `The grammar correction feature uses advanced natural language processing algorithms to identify and rectify grammar mistakes in your text, ensuring your messages are clear and well-structured.`,
  },
  {
    id: 7,
    title: `7. Can the "Personal Assistant" translate sentences from Hindi to English?`,
    content: `Yes, the AI chat feature can seamlessly translate sentences from Hindi to English, allowing users to communicate effectively in both languages.`,
  },
  {
    id: 8,
    title: `8. How does the doubt clarification feature function?`,
    content: `The doubt clarification feature enables users to ask questions or seek clarification on specific topics. The AI chat will provide relevant information or explanations to address your doubts`,
  },
  {
    id: 9,
    title: `9. Can the "Personal Assistant" understand sentences phrased in different ways?`,
    content: `Yes, the AI is designed to comprehend sentences expressed in various forms. If you present a sentence in multiple ways, the "Personal Assistant" will provide the same meaning in different linguistic expressions.`,
  },
  {
    id: 10,
    title: `10. Is the grammar correction feature available for languages other than English?`,
    content: `Currently, the grammar correction feature primarily focuses on the English language. However, updates and expansions for additional languages may be considered in future app releases.`,
  },
  {
    id: 11,
    title: `11. How accurate is the translation from Hindi to English?`,
    content: `The translation feature is designed to be accurate, leveraging state-of-the-art language translation models. However, it's essential to keep in mind that no translation tool is perfect, and occasional nuances may exist.`,
  },
  {
    id: 12,
    title: `12. Can I use the "Personal Assistant" feature offline?`,
    content: `The AI features, including grammar correction, translation, and doubt clarification, require an internet connection to function as they rely on cloud-based processing for optimal performance.`,
  },
  {
    id: 13,
    title: `13. How do I activate the "Personal Assistant" feature?`,
    content: `The "Personal Assistant" feature is integrated into the app's chat interface. Simply start typing, and the AI will automatically engage, providing assistance with grammar, translation, and doubt clarification.
    `,
  },
  {
    id: 14,
    title: `14. Are there plans for future enhancements to the "Personal Assistant" feature?`,
    content: `Yes, we are committed to continuous improvement and innovation. Future updates may include additional language support, enhanced features, and improvements based on user feedback. Stay tuned for exciting developments!`,
  },
];
const Faq = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Header
        text={'FAQ'}
        onBack={() => navigation.goBack()}
        onLogout={() => navigation.navigate('Signin')}
      />
      <ScrollView style={styles.faqContainer}>
        {faqData.map(faq => (
          <StyledAccordion title={faq.title} content={faq.content} />
        ))}
      </ScrollView>
    </View>
  );
};

export default Faq;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  faqContainer: {
    paddingHorizontal: 12,
  },
});
