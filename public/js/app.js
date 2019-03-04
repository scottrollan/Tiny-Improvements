$(function(){

    //empty kudos, from, and to data and re-render with any updates
    const renderKudos = function(kudos){
        $('#kudosCol').empty();
        kudos.forEach(function(data){
            $('#kudosCol').append(buildKudosCard(data));
        });
    };
    const renderUsers = function(users) {
        $('#kudosTo').empty();
        $('#kudosTo').append("<option selected disabled value>To</option>");
        $('#kudosFrom').empty();
        $('#kudosFrom').append("<option selected disabled value>From</option>");


        users.forEach(function(usersData) {
            $('#kudosTo').append(buildKudosTo(usersData));
            $('#kudosFrom').append(buildKudosFrom(usersData));
        });
    };

    //gets items from api/kudos
    const getKudos = function() {
        $.get('/api/kudos').then(renderKudos);
    };
    //get items from api/users
    const getUsers = function() {
        $.get('/api/users').then(renderUsers);
    };

    //create a card, where <div class="card">=kudosCard, for each kudo in api/kudos
    const buildKudosCard = function(data) {
        const kudosCard = $('<div>').addClass('card kudosCard');

        //appends title, from, to, and body to card^ 
        kudosCard.append (
            $('<h5>').text(data.title),
            $('<h6>').text(`From: ${data.from}`),
            $('<h6>').text(`To: ${data.to}`),
            $('<p>').text(data.body),
            $('<br>')
            );
            return kudosCard;
        };
    //create an option tag for the "From" dropdown menu for each .name from usersData
    //value is set to .name
    const buildKudosFrom = function(usersData) {
        const fromListItem = $('<option>')
        .attr('value', usersData.name)
        .addClass('clickFrom')
        .text(usersData.name);
        return fromListItem;
    };

    //create an option tag for the "To" dropdown menu for each .name from usersData 
    //value is set to _id
    const buildKudosTo = function(usersData) {
        const toListItem = $('<option>')
        .attr('value', usersData._id)
        .addClass('clickTo')
        .text(usersData.name)
        return toListItem;
    };
    //set var newFrom with.from when "Kudo Sender" is selected/changes
    const getFrom = function() {
        $('#kudosFrom').change(function() {
            fromInput = $(this);
            newFrom = fromInput.val();
        });
    };
    //set var newObjectId with .objectId when "Kudo Receiver" is selected/changes
    const getTo = function() {
        $('#kudosTo').change(function() {
            newTo = $("#kudosTo option:selected").text();
            toInput = $(this);
            newObjectId = toInput.val();
            console.log(newTo);
        });
    };

    const pushKudo = function() {
        newTitle = $('#inputTitle').val().trim();
        newBody = $('#inputBody').val().trim();

        let newKudo = {
            title: newTitle,
            body: newBody,
            from: newFrom,
            to: newTo,
            objectId: newObjectId
        };
        $.ajax ({
        method: 'POST',
        url: '/api/kudos/',
        data: newKudo
        });
    location.reload();
    }   


    getKudos();
    getUsers();
    $(document).on('click','#kudosFrom', getFrom);
    $(document).on('click','#kudosTo', getTo);    
    $('#saveBtn').on('click', pushKudo);
});