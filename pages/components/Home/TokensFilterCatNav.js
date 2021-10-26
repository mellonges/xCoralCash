import ScrollContainer from "react-indiana-drag-scroll";
import styles from "../../../styles/components/Home/TokensFilter.module.scss";
import Placeholder from "../common/Placeholder";

const TokensFilterCatNav = ({
  categoriesList,
  activeCategory,
  setActiveCategory,
}) => {
  return (
    <ScrollContainer
      hideScrollbars={true}
      vertical={false}
      className={styles.scrollBar}
    >
      <nav className={`${styles.categoriesNav} ${!(categoriesList && categoriesList.length) ? "overflow-hidden" : "" } `}>
        <ul>
          {categoriesList && categoriesList.length ? (
            categoriesList.map((cat) => (
              <li
                key={cat}
                className={
                  cat === activeCategory.name ? styles.activeCategory : ""
                }
              >
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveCategory({ name: cat, firstTime: false });
                  }}
                >
                  {cat}
                </a>
              </li>
            ))
          ) : (
            <>
              <li>
                <Placeholder width="170px" height="46px" />
              </li>
              <li>
                <Placeholder width="170px" height="46px" />
              </li>
              <li>
                <Placeholder width="170px" height="46px" />
              </li>
              <li>
                <Placeholder width="170px" height="46px" />
              </li>
              <li>
                <Placeholder width="170px" height="46px" />
              </li>
            </>
          )}
        </ul>
      </nav>
    </ScrollContainer>
  );
};

export default TokensFilterCatNav;
