import { NavigationContainer } from '@react-navigation/native';
import MyTabs from './TabsGroup';

export default function Navigation(){
	return (
		<NavigationContainer>
			<MyTabs />
		</NavigationContainer>
	)
}