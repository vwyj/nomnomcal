import { View, Text, ScrollView, StyleSheet } from 'react-native';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import RecipePost from "../components/RecipeAPI/RecipePost";
import FooterMenu from '../components/Menus/FooterMenu';

const MyRecipePosts = () => {

    // State
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);

    // Get User Post
    const getUserPosts = async () => {
        try
        {
            setLoading(true);
            const {data} =await axios.get('/post/get-user-post');
            setLoading(false);
            setPosts(data?.userPosts);
        }
        catch(error)
        {
            setLoading(false);
            console.log(error);
            alert(error);
        }
    };

    // Initial
    useEffect(() => {
        getUserPosts();
    }, []);

    return (
        <View style={styles.container}>
            <ScrollView>
                <RecipePost posts={posts} myPostScreen={true} />
                {/* <Text>{JSON.stringify(posts, null, 4)}</Text> */}
            </ScrollView>
            <FooterMenu/>
        </View>
  );
};

const styles = StyleSheet.create({
    container: 
    {
        flex: 1,
        margin: 10,
        justifyContent: "space-between",
    },
});

export default MyRecipePosts;