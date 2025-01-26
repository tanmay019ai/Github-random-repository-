const language=document.getElementById('lang');
const final=document.getElementById('para');
const refresh=document.getElementById('btn');
const bg=document.getElementById('area1');

language.addEventListener('change', (event) => {
        refresh.innerText='Refresh';
        refresh.style.backgroundColor='black';
    bg.style.background= 'rgb(185, 195, 195, 0.5)';
    const selectedLanguage = event.target.value;
    console.log(selectedLanguage);
    if(selectedLanguage==='Select a language')
        {
            bg.style.background= 'rgb(185, 195, 195, 0.5)';
            final.innerHTML=`<p>Please select a language...</p>`;
            return;
        }
    final.innerHTML=`<p>Fetching top repositories for ${selectedLanguage}...</p>`;
    searchRepositoriesByLanguage(selectedLanguage).then(repositories => {
        if (repositories.length > 0) {
            var num=Math.floor(Math.random(0,repositories.length)*repositories.length); ;
            const repo = repositories[num];
            final.innerHTML = `
                <div class="repo-card">
                    <h2><a href="${repo.html_url}" target="_blank">${repo.name}</a></h2>
                    <p>${repo.description}</p>
                    <div class="repo-details">
                        <span><strong>Stars:</strong> ${repo.stargazers_count}</span>
                        <span><strong>Language:</strong> ${repo.language}</span>
                    </div>
                </div>
            `;
        } else {
            console.log('No repositories found.');
        }
    }).catch(error => {
        bg.style.background= 'rgb(255, 0, 0, 0.7)';
        final.innerHTML = '<p>Error fetching repositories</p>';
        console.error('Error fetching repositories:', error);
        refresh.innerText='Click to Retry';
        refresh.style.backgroundColor='red';    
    });
    refresh.style.display='block';

});

refresh.addEventListener('click', () => {
    refresh.innerText='Refresh';
        refresh.style.backgroundColor='black';
    bg.style.background= 'rgb(185, 195, 195, 0.5)';
    const selectedLanguage = language.value;
    if (selectedLanguage === 'Select a language') {
        final.innerHTML = `<p>Please select a language...</p>`;
        return;
    }
    final.innerHTML = `<p>Fetching top repositories for ${selectedLanguage}...</p>`;
    searchRepositoriesByLanguage(selectedLanguage).then(repositories => {
        if (repositories.length > 0) {
            var num = Math.floor(Math.random() * repositories.length);
            const repo = repositories[num];
            final.innerHTML = `
                <div class="repo-card">
                    <h2><a href="${repo.html_url}" target="_blank">${repo.name}</a></h2>
                    <p>${repo.description}</p>
                    <div class="repo-details">
                        <span><strong>Stars:</strong> ${repo.stargazers_count}</span>
                        <span><strong>Language:</strong> ${repo.language}</span>
                    </div>
                </div>
            `;
        } else {
            console.log('No repositories found.');
        }
    }).catch(error => {
        bg.style.background= 'rgb(255, 0, 0, 0.7)';
        final.innerHTML = '<p>Error fetching repositories.</p>';
        console.error('Error fetching repositories:', error);
        refresh.innerText='Click to Retry';
        refresh.style.backgroundColor='red'; 
    });
});


const searchRepositoriesByLanguage = async (selectedLanguage) => {
    const url = `https://api.github.com/search/repositories?q=language:${selectedLanguage}&sort=stars&order=desc`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.items;
    } catch (error) {
        console.error('Error fetching repositories:', error);
    }
};

// Example usage:
// searchRepositoriesByLanguage(repo1).then(repositories => {
//     repositories.forEach(repo => {
//         console.log(`Name: ${repo.name}, Stars: ${repo.stargazers_count}, URL: ${repo.html_url}`);
//     });
// });
