import Image from "next/image";
import classes from "./Hero.module.css";

function Hero() {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src="/images/site/max.png"
          alt="An picture of the author"
          width={300}
          height={300}
          priority
        />
      </div>
      <h1>James Buttman</h1>
      <p>This is a personal blog.</p>
    </section>
  );
}

export default Hero;
