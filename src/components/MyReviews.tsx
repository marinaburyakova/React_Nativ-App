import React from 'react'
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Linking,
  ActivityIndicator,
} from 'react-native'
import { useQuery } from '@apollo/client/react'
import { GET_CURRENT_USER } from '../graphql/queries'
import useDeleteReview from '../hooks/useDeleteReview'

interface ReviewNode {
  id: string
  text: string
  rating: number
  createdAt: string
  repository: {
    id: string
    fullName: string
    url: string
  }
}

interface MeResponseData {
  me: {
    id: string
    username: string
    reviews: {
      edges: Array<{
        node: ReviewNode
      }>
    }
  } | null
}

const MyReviews = () => {
  const { data, loading, error } = useQuery<MeResponseData>(GET_CURRENT_USER, {
    variables: { includeReviews: true },
    fetchPolicy: 'cache-and-network',
  })

  const [deleteReview] = useDeleteReview()

  if (loading)
    return (
      <ActivityIndicator
        style={{ flex: 1 }}
        size="large"
        color="#0366d6"
      />
    )
  if (error)
    return (
      <Text style={{ color: 'red', textAlign: 'center', marginTop: 20 }}>
        Error: {error.message}
      </Text>
    )

  const reviews = data?.me?.reviews?.edges.map((edge) => edge.node) || []

  const handleDelete = (id: string) => {
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteReview(id)
            } catch (e: any) {
              Alert.alert('Error', e.message)
            }
          },
        },
      ],
    )
  }

  return (
    <FlatList
      data={reviews}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.container}>
          <View style={styles.reviewContent}>
            <View style={styles.ratingBadge}>
              <Text style={styles.ratingText}>{item.rating}</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.repoName}>{item.repository.fullName}</Text>
              <Text style={styles.date}>
                {new Date(item.createdAt).toLocaleDateString()}
              </Text>
              {item.text ? (
                <Text style={styles.bodyText}>{item.text}</Text>
              ) : null}
            </View>
          </View>

          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.viewButton}
              onPress={() => Linking.openURL(item.repository.url)}
            >
              <Text style={styles.buttonText}>View repository</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDelete(item.id)}
            >
              <Text style={styles.buttonText}>Delete review</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    padding: 16,
    marginVertical: 6,
    marginHorizontal: 16,
    borderRadius: 8,
  },
  reviewContent: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  ratingBadge: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    borderWidth: 2,
    borderColor: '#0366d6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  ratingText: {
    color: '#0366d6',
    fontWeight: 'bold',
    fontSize: 16,
  },
  textContainer: {
    flex: 1,
  },
  repoName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#24292e',
    marginBottom: 2,
  },
  date: {
    fontSize: 13,
    color: '#586069',
    marginBottom: 8,
  },
  bodyText: {
    fontSize: 14,
    color: '#333333',
    lineHeight: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  viewButton: {
    flex: 1,
    backgroundColor: '#0366d6',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  deleteButton: {
    flex: 1,
    backgroundColor: '#d73a49',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 15,
  },
})

export default MyReviews
