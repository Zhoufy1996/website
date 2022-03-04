import { InferGetStaticPropsType, GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps<{ title:string | undefined }> = async () => ({
  props: {
    title: 'about',
  },
});

function About({ title } :InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div>{title}</div>
  );
}

export default About;
