const ResultCard = ({ tvShow }) => (
<div>
  <p>{ tvShow.name }</p>
  <p>
    {tvShow.locations.map((platform, index) => {
      if (index < tvShow.locations.length - 1) {
        return `${platform.display_name}, `;
      } return `${platform.display_name}.`;
    })}
  </p>
</div>);

export default ResultCard;
