import "./FriendList.css";

const FriendList = () => {
    return(<>
        <div id="FriendList-Title-Container">
            <h4 id="FriendList-Title">Chats</h4>
        </div>
        <div id="FriendList">
            <div className="Friend">
                <p className="Friend-Username">Robert Downey Jr.</p>
            </div>
            <div className="Friend">
                <p className="Friend-Username">Steve Rogers</p>
            </div> 
            <div className="Friend">
                <p className="Friend-Username">Bucky Barns</p>
            </div> 
        </div>
    </>)
};

export default FriendList;