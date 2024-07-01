import styles from './Forum.module.css';

const comments = [
  { text: 'Comentário 1', likes: 10 },
  { text: 'Comentário 2', likes: 20 },
  { text: 'Comentário 3', likes: 15 },
];

const Forum = () => {
  return (
    <section className={styles.forum}>
      <h2>Tema do Fórum</h2>
      <p>Breve descrição sobre o tema discutido no fórum.</p>
      <div className={styles.comments}>
        {comments.sort((a, b) => b.likes - a.likes).map((comment, index) => (
          <div key={index} className={styles.comment}>
            <p>{comment.text}</p>
            <span>{comment.likes} likes</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Forum;
