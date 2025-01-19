const Home = () => {
  return (
    <div>
      <h1>About Scholar Saver!</h1>
      <h3>Inspiration</h3>
      <p>
        College students often struggle with managing their finances, balancing
        personal spending, educational expenses, and student loans. Scholar
        Saver was inspired by the need for an accessible, intuitive tool that
        empowers students to take control of their financial well-being. By
        visualizing their monetary spending, students can make informed
        decisions to achieve better financial stability during their academic
        journey.
      </p>
      <h3>What It Does</h3>
      <p>
        Scholar Saver is a financial management tool designed specifically for
        college students. It helps users track and visualize their personal
        spending habits while also monitoring educational expenses, including
        tuition, textbooks, and student loans. The platform allows users to
        upload their transactions for a streamlined overview of their financial
        activity and gain insights into spending patterns through clear,
        interactive visualizations.
      </p>
      <h3>How We Built It</h3>
      <p>
        Scholar Saver was developed using JavaScript and React for creating a
        dynamic, user-friendly interface. CSS and HTML were used to style and
        structure the website, while SupaBase managed the backend, including
        database storage and handling user-uploaded CSV files.
      </p>
      <h3>Challenges We Ran Into</h3>
      <p>
        One significant challenge we faced was connecting the process of
        uploading CSV files to SupaBase and ensuring that the data displayed
        accurately on the website. Debugging the file parsing and integrating it
        seamlessly with the backend required extensive problem-solving and
        collaboration.
      </p>
      <h3>Accomplishments That We&apos;re Proud Of</h3>
      <p>
        We are incredibly proud of the impactful visualizations that provide
        students with actionable insights into their finances. Creating a tool
        that has the potential to make a meaningful difference in the lives of
        college students by promoting financial literacy and responsibility is a
        major accomplishment for our team.
      </p>
      <h3>What We Learned</h3>
      <p>
        Through building Scholar Saver, we gained valuable experience in
        full-stack development, from frontend design to backend integration. We
        also learned how to work with SupaBase to manage data efficiently and
        securely. Most importantly, we understood the importance of
        user-centered design and creating a tool tailored to the needs of our
        target audience.
      </p>
      <h3>What’s Next for Scholar Saver</h3>
      <p>
        Our vision for Scholar Saver includes expanded features such as
        predictive analytics to forecast future expenses and savings, as well as
        mobile app development to make the platform accessible on the go. We
        also aim to integrate the tool with financial services like Plaid to
        sync users’ bank accounts for real-time tracking. Additionally, we plan
        to introduce community resources that offer tips, tools, and guides to
        enhance financial literacy among students.
      </p>
    </div>
  );
};
export default Home;
